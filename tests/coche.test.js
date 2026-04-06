const cocheService = require('../src/rmz/service/coche.service');
const cocheRepository = require('../src/rmz/repository/coche.repository');

// Simulamos el repositorio para no depender de la base de datos real en los tests unitarios
jest.mock('../src/rmz/repository/coche.repository');

describe('Pruebas Unitarias - Sistema Gestión Concesionario', () => {

    // Limpiamos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Método: consultarCochesPorMarca', () => {
        
        test('Caso 1: Marca existente ("Seat") -> Retorna lista con 3 coches', async () => {
            // Preparamos el mock para simular que la BD devuelve 3 Seats
            const mockCoches = [
                { identificador: 2, marca: 'Seat', modelo: 'León', cilindrada: 1600 },
                { identificador: 4, marca: 'Seat', modelo: 'Clio', cilindrada: 1400 },
                { identificador: 5, marca: 'Seat', modelo: 'Ibiza', cilindrada: 1400 }
            ];
            cocheRepository.findByMarca.mockResolvedValue(mockCoches);

            const resultado = await cocheService.consultarCochesPorMarca('Seat');

            expect(resultado).toHaveLength(3);
            expect(cocheRepository.findByMarca).toHaveBeenCalledWith('Seat');
        });

        test('Caso 2: Marca inexistente ("Ferrari") -> Retorna lista vacía []', async () => {
            // Simulamos que la BD no encuentra nada
            cocheRepository.findByMarca.mockResolvedValue([]);

            const resultado = await cocheService.consultarCochesPorMarca('Ferrari');

            expect(resultado).toEqual([]);
            expect(resultado).toHaveLength(0);
        });
    });

    describe('Método: crearNuevoCoche', () => {

        test('Caso 1: Cilindrada nula -> Error de validación', async () => {
            const cocheInvalido = { marca: 'Volkswagen', modelo: 'Golf', cilindrada: null };

            // Verificamos que el servicio lanza el error antes de ir a la BD
            await expect(cocheService.crearNuevoCoche(cocheInvalido))
                .rejects
                .toThrow("La cilindrada debe ser mayor que 0");
            
            // Verificamos que el repositorio NUNCA fue llamado
            expect(cocheRepository.save).not.toHaveBeenCalled();
        });

        test('Caso 2: Cilindrada negativa (-1200) -> Error de validación', async () => {
            const cocheInvalido = { marca: 'Volkswagen', modelo: 'Golf', cilindrada: -1200 };

            await expect(cocheService.crearNuevoCoche(cocheInvalido))
                .rejects
                .toThrow("La cilindrada debe ser mayor que 0");
            
            expect(cocheRepository.save).not.toHaveBeenCalled();
        });

        test('Caso 3: Datos válidos -> Coche creado correctamente', async () => {
            const cocheValido = { marca: 'Volkswagen', modelo: 'Golf', cilindrada: 2000 };
            const cocheGuardado = { identificador: 8, ...cocheValido }; // Simulamos la respuesta con ID

            // Simulamos el guardado exitoso
            cocheRepository.save.mockResolvedValue(cocheGuardado);

            const resultado = await cocheService.crearNuevoCoche(cocheValido);

            expect(resultado).toEqual(cocheGuardado);
            expect(cocheRepository.save).toHaveBeenCalledWith(cocheValido);
        });
    });
});