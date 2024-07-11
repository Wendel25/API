const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/data", (req, res) => {
  const { name, age, occupation } = req.body;

  const data = `Nome: ${name}, Idade: ${age}, Profissão: ${occupation}\n`;

  fs.appendFile("dadosAPI.txt", data, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados:", err);
      res.status(500).send("Erro ao salvar os dados.");
    } else {
      console.log("Dados salvos com sucesso:", data);
      res.status(200).json({ message: "Dados recebidos e salvos." });
    }
  });
});

app.get("/data", (req, res) => {
  fs.readFile(path.resolve(__dirname, "dadosAPI.txt"), "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler os dados:", err);
      res.status(500).send("Erro ao ler os dados.");
    } else {
      const lines = data.trim().split("\n");

      const dataArray = lines.map((line) => {
        const parts = line.split(", ");
        const nome = parts[0].split(": ")[1];
        const idade = parts[1].split(": ")[1];
        const profissao = parts[2].split(": ")[1];
        return { nome: nome, idade: idade, profissao: profissao };
      });

      res.status(200).json(dataArray);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
