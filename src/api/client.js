import { analysis } from '../mock/analysis'

const USE_MOCK = true // set to false in Week 4

export async function getAnalysis(repoUrl) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 700)) // fake network delay
    if (repoUrl && repoUrl.includes('fail')) {
      throw new Error('Could not load this repository. It may be private or not exist.')
    }
    const name = repoUrl ? repoUrl.replace('https://github.com/', '') : analysis.repo
    return { ...analysis, repo: name }
  }
  // Week 4: real axios call to Vasuki's backend goes here
}