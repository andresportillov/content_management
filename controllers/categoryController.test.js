// categoryController.test.js

const { getCategory } = require("./categoryController");
const Category = require("../models/Category");

jest.mock("../models/Category"); // Mockear el modelo Category

describe("CategoryController", () => {
  describe("getCategory", () => {
    it("debería obtener una categoria por su NAME", async () => {
      // Configuración del mock
      const mockedCategory = { name: "video" };
      Category.findOne.mockResolvedValue(mockedCategory);

      // Simula los parámetros req y res
      const req = { query: { name: "video" } };
      const res = { json: jest.fn() };

      // Llama al servicio
      await getCategory(req, res);

      // Verificaciones
      expect(res.json).toHaveBeenCalledWith(mockedCategory);
    });

    it("debería manejar errores al obtener una categoria", async () => {
      // Configuración del mock para simular un error
      Category.findOne.mockRejectedValue(new Error("Database error"));

      // Simula los parámetros req y res
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Llama al servicio
      await getCategory(req, res);

      // Verificaciones
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error");
    });
  });
});
