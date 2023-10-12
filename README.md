<center>
    <h1>Gitlab Time Reporter</h1>
    <a href="https://www.buymeacoffee.com/mattiasghodsian" target="_new">
        <img src="https://img.shields.io/badge/Donate-Coffee-blue?style=for-the-badge&amp;logo=buymeacoffee" alt="Donate Coffee">
    </a>
    <a href="https://github.com/mattiasghodsian/gitlab-time-reporter/stargazers" target="_new"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/mattiasghodsian/gitlab-time-reporter?style=for-the-badge&logo=github&label=Stars&color=blue"></a>
    <a href="https://github.com/mattiasghodsian/gitlab-time-reporter/network/members" target="_new"><img alt="GitHub forks" src="https://img.shields.io/github/forks/mattiasghodsian/gitlab-time-reporter?style=for-the-badge&logo=github&label=Forks&color=blue"></a>
    <a href="https://github.com/mattiasghodsian/gitlab-time-reporter/releases/latest" target="_new"><img alt="Latest Release" src="https://img.shields.io/github/v/release/mattiasghodsian/gitlab-time-reporter?style=for-the-badge&logo=github&label=Latest%20Release&color=blue"></a>
    <p>Create a time report for issues in all group repositories within self-hosted GitLab. </p>
</center>

## How to
1. Copy or rename the `.env.example` to `.env` and fill in values (NOTE: create a token for the group that contains multi repos, do not make a personal token).
2. Install all modules for the project `npm install`
3. Run `node index.js`, if you need help run `node index.js --help`
4. A new file will be generated `TimeReport.xlsx`

```terminal
$ node index.js --help
Usage: index [OPTIONS]...

Options:
  -v, --version         output the version number
  -s, --state <value>   The state of each issue, e.g., opened, closed (default: "closed")
  -a, --after <value>   Get issues after date (2023-10-01)
  -b, --before <value>  Get issues before date  (2023-10-31)
  -h, --help            display help for command
```