// contentController.test.js

const { getContents } = require("./contentController");
const Content = require("../models/Content");

jest.mock("../models/Content"); // Mockear el modelo Content

describe("ContentController", () => {
  describe("getContents", () => {
    it("debería obtener todos los contenidos sin filtro de búsqueda", async () => {
      // Configuración del mock
      const mockedContents = [
        { title: "Content 1", topic: "Topic 1" },
        { title: "Content 2", topic: "Topic 2" },
      ];
      Content.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockedContents),
      });

      // Simula los parámetros req y res
      const req = { query: {} };
      const res = { json: jest.fn() };

      // Llama al servicio
      await getContents(req, res);

      // Verificaciones
      expect(Content.find).toHaveBeenCalledWith({ isRemove: false });
      expect(res.json).toHaveBeenCalledWith(mockedContents);
    });

    it("debería obtener los contenidos con filtro de búsqueda", async () => {
      // Configuración del mock
      const mockedContents = [
        { title: "Search Content 1", topic: "Search Topic 1" },
        { title: "Search Content 2", topic: "Search Topic 2" },
      ];
      Content.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockedContents),
      });

      // Simula los parámetros req y res
      const req = { query: { search: "Search" } };
      const res = { json: jest.fn() };

      // Llama al servicio
      await getContents(req, res);

      // Verificaciones
      expect(Content.find).toHaveBeenCalledWith({
        isRemove: false,
        $or: [
          { title: { $regex: "Search", $options: "i" } },
          { topic: { $regex: "Search", $options: "i" } },
        ],
      });
      expect(res.json).toHaveBeenCalledWith(mockedContents);
    });

    it("debería manejar errores al obtener los contenidos", async () => {
      // Configuración del mock para simular un error
      Content.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      // Simula los parámetros req y res
      const req = { query: {} };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      // Llama al servicio
      await getContents(req, res);

      // Verificaciones
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error");
    });
  });
});
