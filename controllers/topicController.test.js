// topicController.test.js

const { getTopics } = require("./topicController");
const Topic = require("../models/Topic");

jest.mock("../models/Topic");

describe("TopicController", () => {
  describe("getTopics", () => {
    it("debería obtener todos los temas que no están eliminados", async () => {
      // Configuración del mock
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      const mockedTopics = [
        { name: "JavaScript", isRemove: false },
        { name: "Node.js", isRemove: false },
      ];
      Topic.find.mockResolvedValue(mockedTopics);

      // Llamada al servicio
      await getTopics(req, res);

      // Verificaciones
      expect(Topic.find).toHaveBeenCalledWith({ isRemove: false });
      expect(res.json).toHaveBeenCalledWith(mockedTopics);
    });

    it("debería manejar errores del servidor", async () => {
      // Configuración del mock para simular un error
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      Topic.find.mockRejectedValue(new Error("Database error"));

      // Llamada al servicio
      await getTopics(req, res);

      // Verificaciones
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server Error");
    });
  });
});
