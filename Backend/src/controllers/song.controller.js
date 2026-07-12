const songModel = require("../models/song.model");
const id3 = require("node-id3");
const {uploadFile} = require("../services/storage.service");


async function uploadSong(req, res){
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
    const {mood} = req.body;

    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            filename: tags.title+".mp3",
            folder: "/moodify/songs"
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title+".jpeg",
            folder: "/moodify/posters"
        })
    ])

    // const songFile = await uploadFile({
    //     buffer: songBuffer,
    //     filename: tags.title+".mp3",
    //     folder: "/moodify/songs"
    // })

    // const posterFile = await uploadFile({
    //     buffer: tags.image.imageBuffer,
    //     filename: tags.title+".jpeg",
    //     folder: "/moodify/posters"
    // })

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })


    res.status(201).json({
        message: "Song created successfully",
        song
    })
}

async function getSong(req,res){
    const {mood} = req.query;
    // const song = await songModel.findOne({mood});
    const [song] = await songModel.aggregate([
        {
            $match: { mood }
        },
        {
            $sample: { size: 1 }
        }
    ]);

    if (!song) {
        return res.status(404).json({
            message: "No song found for this mood"
        });
    }
    res.status(200).json({
        message: "Song fetched successfully",
        song
    })
}

module.exports = {
    uploadSong,
    getSong
}