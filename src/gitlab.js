/**
 * Author: Mattias Ghodsian
 * License: MIT
 * Repo: https://github.com/mattiasghodsian/gitlab-time-reporter
 * Donate: https://www.buymeacoffee.com/mattiasghodsian
 */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default {
    getProjects() {
        return new Promise((resolve, reject) => {
            axios.request(
                {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://${process.env.GITLAB_DOMAIN}/api/v4/projects`,
                    headers: {
                        'Authorization': `Bearer ${process.env.GITLAB_TOKEN}`,
                    }
                }
            ).then((response) => {
                if (response.status !== 200) {
                    reject('getProjects: Request failed code: ' + response.status);
                }
                let dataObject = {};

                response.data.forEach((project) => {
                    const id = project.id;
                    const name = project.name;
                    const path = project.path_with_namespace;

                    dataObject[id] = {
                        'repo': name,
                        'path': path,
                        'time': 0
                    };
                });

                resolve(dataObject);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getTimeFromIssues(id, state, after, before) {
        return new Promise((resolve, reject) => {
            axios.request(
                {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://${process.env.GITLAB_DOMAIN}/api/v4/projects/${id}/issues?state=${state}&created_after=${after}&created_before=${before}`,
                    headers: {
                        'Authorization': `Bearer ${process.env.GITLAB_TOKEN}`,
                    }
                }
            ).then((response) => {
                if (response.status !== 200) {
                    reject('getTimeFromIssues: Request failed code: ' + response.status);
                }

                let total_estimate = 0;
                let total_spent = 0;

                response.data.forEach((issue) => {
                    total_estimate += issue.time_stats.time_estimate ?? 0;
                    total_spent += issue.time_stats.total_time_spent ?? 0;
                });

                resolve({
                    "estimate": this.converToHumenTime(total_estimate),
                    'spent': this.converToHumenTime(total_spent)
                });
            }).catch((error) => {
                reject(error);
            });
        });
    },
    async getTimeReport(projects, state, after, before) {
        return new Promise(async (resolve, reject) => {
            let data = {};
            const promises = Object.keys(projects).map(async (key) => {
                try {
                    const timeReport = await this.getTimeFromIssues(
                        key,
                        state,
                        after,
                        before
                    );
                    projects[key]['time'] = timeReport;
                    data[key] = projects[key];
                } catch (error) {
                    console.error('getTimeFromIssues: Error fetching time report:', error);
                    reject(error);
                }
            });

            try {
                await Promise.all(promises);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    converToHumenTime(seconds) {
        seconds = Number(seconds);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const hDisplay = hours > 0 ? `${hours}h` : '';
        const mDisplay = minutes > 0 ? `${minutes}m` : '';
    
        if (!hDisplay && !mDisplay) {
            return `${seconds}s`;
        }
    
        return `${hDisplay}${mDisplay}`;
    }
}