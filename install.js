module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/CharafChnioune/MFLUX-WEBUI.git app"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      when: "{{exists('app')}}",
      method: "fs.link",
      params: {
        drive: {
          "models": "app/models",
          "lora": "app/lora",
          "output": "app/output",
          "prompts": "app/prompts"
        }
      }
    },
    {
      when: "{{exists('app')}}",
      method: "shell.run",
      params: {
        path: "app",
        conda: {
          "path": "{{path.resolve(cwd, 'conda_env')}}",
          "python": "python=3.12"
        },
        message: [
          "python -m pip install --upgrade pip",
          "pip install -r requirements.txt"
        ]
      }
    }
  ]
}
