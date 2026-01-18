module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        conda: {
          "path": "{{path.resolve(cwd, 'conda_env')}}"
        },
        env: {
          "PYTHONUNBUFFERED": "1"
        },
        path: "app",
        message: [
          "python webui.py",
        ],
        on: [{
          "event": "/http:\\/\\/(?:127\\.0\\.0\\.1|localhost|0\\.0\\.0\\.0):\\d{2,5}/",
          "done": true
        }, {
          "event": "/error:/i",
          "break": false
        }, {
          "event": "/errno/i",
          "break": false
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event ? input.event[0] : ''}}"
      }
    }
  ]
}
