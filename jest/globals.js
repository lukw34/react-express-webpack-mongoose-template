console.error = jest.fn(warn => {
    throw new Error(warn);
});
