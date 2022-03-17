const fs = require('fs')
const chalk = require('chalk')

const addnotes = (title, body) => {
    const notes = loader()
    const duplicatearray = notes.filter((note) => {
        return (note.title === title)
    })
    if (duplicatearray.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse("New note created "))
        saver(notes)
    }
    else {
        console.log(chalk.red.inverse("Title already Taken"))
    }
}

const saver = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loader = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    }
    catch (er) {
        return []
    }
}

const removenotes = (title) => {
    const notes = loader()
    const notes_retained = notes.filter((note) => {
        return (note.title != title)
    })
    if (notes_retained.length === notes.length) {
        console.log(chalk.red.inverse("Note not found"))
    }
    else {
        console.log(chalk.green.inverse("Note removed"))
        saver(notes_retained)
    }
}

const listnotes = () => {
    const mynotes = loader()
    console.log(chalk.blue("Your notes are"))
    mynotes.forEach((notess) => {
        console.log(notess.title)
    })
}

const readnotes = (title) => {
    const notes = loader()
    const foundarray = notes.filter((note) => {
        return (note.title != title)
    })
    if (foundarray.length === 0) {
        console.log(chalk.red.inverse("Note not present"))
    }
    else {
        console.log(chalk.blue(foundarray[0].title))
        console.log(chalk.white(foundarray[0].body))
        
    }
}

module.exports = {
    addnotes: addnotes,
    removenotes: removenotes,
    listnotes: listnotes,
    readnotes: readnotes
}
