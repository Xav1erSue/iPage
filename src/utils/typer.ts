const HELLOWORLD = [
    "你好，世界",
    "Hello World",
    "Bonjour monde",
    "Pozdrav svijete",
    "Hallo Welt",
    "こんにちは世界",
    "Привет мир",
    "Salut Lume",
    "สวัสดีชาวโลก",
    "¡Hola Mundo",
    "Привіт Світ",
    "안녕 세상아",
];

interface Sentence {
    value: String
}

// 打字机效果
export default (sentence: Sentence) => {
    setTimeout(() => {
        const data =
            HELLOWORLD[Math.floor(Math.random() * HELLOWORLD.length)].split("");
        let i = 0;
        const typer = setInterval(() => {
            if (i < data.length) {
                sentence.value += data[i];
                i++;
            } else clearInterval(typer);
        }, 180);
    }, 1000);
}
