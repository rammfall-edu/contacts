Устанавливаем [nodejs](https://nodejs.org/en/)(у кого нет само собой, если у вас есть, в идеале чтобы она была выше или равна 16 версиии а то и лучше)
Чтобы проверить версию, вводите в терминале системы:
```bash
node -v
```

когда устанавливаете, ставьте все галочки

После установки, если были открыты терминалы, закрывайте их все и открывайте в папке с этим репо
Заходим в папку сервер

```bash
cd server
```

И после устанавливаем зависимости

```bash
npm install
```

Когда процесс завершится, запускаем сервер

```bash
node server.mjs
```

все, сервер запустился. Чтобы его остановить жмите клавиши в терминале ctrl + C (control + c для мака)

Установить [postman](https://www.postman.com/downloads/)