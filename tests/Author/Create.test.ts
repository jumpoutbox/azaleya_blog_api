import { testServer } from "../jest.setup";
import { StatusCodes } from 'http-status-codes';

describe("Author - Create", () => {

  it("criar um registro", async () => {
    const testeAuthorSave = await testServer.post('/author')
      .send({
        firstname: "William",
        lastname: "bragansa",
        email: "teste@test.com",
        password: "novaObrigatorio",
        userId: 1
      })

      expect(testeAuthorSave.statusCode).toEqual(StatusCodes.CREATED);
      expect(typeof testeAuthorSave.body).toEqual('number');
  })

    it("Erro Firstname caracter maior que 6", async () => {
    const testeAuthorSave = await testServer.post('/author')
      .send({
        firstname: "Wili",
        lastname: "bragansa",
        email: "teste@test.com",
        password: "novaObrigatorio",
        userId: 1
      })

      expect(testeAuthorSave.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(testeAuthorSave.body).toHaveProperty('errors.body.firstname');
  })
});