module.exports = {
  run: [{
    method: "shell.run",
    params: {
      message: "git pull"
    }
  }, {
    when: "{{exists('app')}}",
    method: "shell.run",
    params: {
      path: "app",
      message: "git pull"
    }
  }, {
    when: "{{exists('app') && exists('conda_env')}}",
    method: "shell.run",
    params: {
      path: "app",
      conda: {
        "path": "{{path.resolve(cwd, 'conda_env')}}"
      },
      message: [
        "python -m pip install --upgrade pip",
        "pip install -r requirements.txt"
      ]
    }
  }]
}
