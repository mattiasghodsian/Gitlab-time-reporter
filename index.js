/**
 * Author: Mattias Ghodsian
 * License: MIT
 * Repo: https://github.com/mattiasghodsian/gitlab-time-reporter
 * Donate: https://www.buymeacoffee.com/mattiasghodsian
 */
import ExcelJS from 'exceljs';
import cli from './src/cli.js';
import gitlab from './src/gitlab.js';

const args = cli.commandLine();
if (!args.after && !args.before) {
    console.error('Please provide --after & --before options to continue.');
    process.exit(1);
}

gitlab.getProjects()
    .then((projects) => {
        gitlab.getTimeReport(projects, args.state, args.after, args.before)
            .then((response) => {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('TimeReport');

                // Add headers to the worksheet
                worksheet.addRow(['Repo', 'Path', 'Estimate', 'Spent']);

                // Add data from the response to the worksheet
                for (const projectId in response) {
                    const project = response[projectId];
                    worksheet.addRow([project.repo, project.path, project.time.estimate, project.time.spent]);
                }

                // Save the workbook to a file
                workbook.xlsx.writeFile('TimeReport.xlsx')
                    .then(function () {
                        console.log('Excel file saved successfully.');
                    })
                    .catch(function (error) {
                        console.error('Error saving Excel file:', error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    })
    .catch((error) => {
        console.error(error);
    });