import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  telefones: [{
    numero: String,
    ddd: String,
    _id: false,
  }],
  ultimo_login: Date,
  token: String,
}, {
  timestamps: {
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
