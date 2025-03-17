const mockAxios = {
    get: jest.fn() as jest.Mock<Promise<any>, [string, any?]>,
};

export default mockAxios;
