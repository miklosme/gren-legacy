module.exports = function extractRepoId(repositoryPath) {
    const [owner, name] = repositoryPath.replace(/.*github\.com[:\/]([\w|-]+\/[\w|-]+)(\.git)?/, (_, p) => p).split('/');
    return { owner, name };
}