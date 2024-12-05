import express from "express";
const app = express();


// app.get("/", (req,res)=> {
//     res.send("Hello World");
// })

// get a list of 5 jokes
app.get("/api/jokes", (req, res) => {
    const jokes = [
        {
            id: 1,
            title: "Why don't scientists trust atoms? Because they make up everything.",
            likes: 10,
            dislikes: 2
            },
            {
                id: 2,
                title: "Why don't eggs tell jokes? They'd crack each other up.",
                likes: 5,
                dislikes: 1
                },
                {
                    id: 3,
                    title: "Why did the tomato turn red?",
                    likes: 8,
                    dislikes: 3
                    },
                    {
                        id: 4,
                        title: "What do you call a fake noodle?",
                        likes: 12,
                        dislikes: 4
                        },
                        {
                            id: 5,
                            title: "Why did the scarecrow win an award?",
                            likes: 15,
                            dislikes: 5
                            }
                    
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, (req,res)=> {
    console.log(`Server is running on port http://localhost:${port}`);
})