
import { analysis } from '../mock/analysis'

const USE_MOCK = true // set to false in Week 4

function buildGuide(name, files) {
  const top = [...files]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5)

  const high = files.filter(
    (f) => f.riskLevel === 'high'
  ).length

  return `# Welcome to ${name}

This guide covers ${files.length} analyzed files, ${high} of them flagged as high potential risk.

## Where to start

1. Read the README and the main entry point.
2. Review the files listed below before making changes.
3. Check who owns each file and ask them questions.

## Files that need extra care

${top
  .map(
    (f) =>
      `- \`${f.path}\`: risk score ${f.riskScore}. ${f.reasons[0] || ''}`
  )
  .join('\n')}

## Important note

Risk scores are indicative signals, not proof of bugs.
`
}

export async function getAnalysis(repoUrl) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 700)) // fake network delay

    if (repoUrl && repoUrl.includes('fail')) {
      throw new Error(
        'Could not load this repository. It may be private or not exist.'
      )
    }

    const name = repoUrl
      ? repoUrl.replace('https://github.com/', '').replace(/\/$/, '')
      : analysis.repo

    return {
      ...analysis,
      repo: name,
      onboardingGuide: buildGuide(name, analysis.files),
    }
  }

  // Week 4: real axios call to the backend goes here
}
