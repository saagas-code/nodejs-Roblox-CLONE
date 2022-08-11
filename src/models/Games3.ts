import {model, connection, Model, Schema} from 'mongoose'

type PhrasesType = {
    _id: string,
    name: string,
    link: string,
    like: string,
    players: string,
    img: string,
    
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<PhrasesType>({
    _id: String,
    name: String,
    link: String,
    like: String,
    players: String,
    img: String,
    
}, {
    versionKey: false
})

const modelName: string = 'Games3'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<PhrasesType>) 
:
    model<PhrasesType>(modelName, schema)