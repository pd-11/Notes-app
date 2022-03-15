const chalk = require('chalk')
const yargs = require('yargs')
const mynotes = require('./notes')
const notes = require('./notes')

//add command
yargs.command({
    command: 'add',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        },
        body: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        mynotes.addnotes(argv.title, argv.body)
    }
})

//remove command
yargs.command({
    command: 'remove',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        mynotes.removenotes(argv.title)
    }
})

//list command
yargs.command({
    command: 'list',
    handler: (argv) => {
        notes.listnotes()
    }
})

//read command
yargs.command({
    command: 'read',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readnotes(argv.title)
    }
})

yargs.parse()    //parses the arguments