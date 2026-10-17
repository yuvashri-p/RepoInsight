import { analysis } from '../mock/analysis'

const USE_MOCK = true   // change to false in Week 4

export async function getAnalysis(repoUrl) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 500))   // fake delay to test loading state
    return analysis
  }
  // Week 4: replace with a real axios call to Vasuki's endpoint
}