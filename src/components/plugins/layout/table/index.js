import React from 'react'

// You are obviously not limited to material-ui, but we really enjoy
// the material-ui svg icons!
import GridOn from 'material-ui/svg-icons/image/grid-on'

// This is the ReactJS component which you can find below this snippet
import Table from './Component'
import uuid from 'uuid'
import Slate from 'ory-editor-plugins-slate'


const defaultPlugin = new Slate()
const numRows = 3,
      numCells = 3;

export default {
    Component: Table,
    IconComponent: <GridOn />,
    name: 'serlo/layout/table',
    version: '0.0.1',
    text: 'Tabelle',
    createInitialChildren: () => {
        let rows = []

        for (let i = 0; i < numRows; i++) {
            rows = [...rows, createRow()]
        }
        return ({
            id: uuid.v4(),
            rows: rows
        })
    }
}

const createRow = () => {
    let cells = [];

    for (let i = 0; i < numCells; i++) {
        cells = [...cells, createEmptyCell()]
    }
    return ({
        id: uuid.v4(),
        cells: cells
    })
}

const createEmptyCell = () => ({
    content: { plugin: defaultPlugin, state: defaultPlugin.createInitialState() },
    id: uuid.v4(),
})