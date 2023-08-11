import { testServer } from "../jest.setup";
import { StatusCodes } from 'http-status-codes';

describe("Author - Delete", () => {

  it("Apagar um registro", async () => {
    const testeAuthorSave = await testServer.post('/author')
      .send({
        name: "William",
        surname: "bragansa",
        email: "teste@test.com",
        userId: 1
      })

      expect(testeAuthorSave.statusCode).toEqual(StatusCodes.CREATED);
      
      const testeAuthorDelete = await testServer.delete(`/author/${testeAuthorSave.body}`).send()
      expect(testeAuthorDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })

  it("Erro no ID informado", async() => {
    const testeAuthorDelete = await testServer
          .delete('/author/0')
          .send()
      expect(testeAuthorDelete.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(testeAuthorDelete.body).toHaveProperty('errors.body.id')
  })

    it("Erro ao Apagar um registro inexistente", async () => {
    const testeAuthorDelete = await testServer
          .delete('/author/11')
          .send();

      expect(testeAuthorDelete.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(testeAuthorDelete.body).toHaveProperty('errors.default');
  })
});