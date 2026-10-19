# RepoInsight: Frontend API Contract (proposed)

Status: DRAFT. Vasuki and Sangami, please comment on any field you want renamed.
Base URL: http://localhost:8080 (to be confirmed)

## 1. Analyze a repository

POST /api/analyze
Request:
```json
{ "repoUrl": "https://github.com/owner/repo" }
```
Response 200:
```json
{
  "repo": "owner/repo",
  "analyzedAt": "2026-10-19T10:00:00Z",
  "files": [
    {
      "path": "src/auth/LoginService.java",
      "riskScore": 82,
      "riskLevel": "high",
      "reasons": ["High churn: 45 commits in 90 days", "One author owns 85% of the file"],
      "churnHistory": [
        { "month": "2026-08", "commits": 15 },
        { "month": "2026-09", "commits": 22 }
      ],
      "ownership": [
        { "author": "alice", "percent": 85 },
        { "author": "bob", "percent": 15 }
      ],
      "coChanged": ["src/auth/TokenUtil.java", "src/config/SecurityConfig.java"]
    }
  ]
}
```

## 2. Onboarding guide

GET /api/onboarding?repoUrl=...
Response 200:
```json
{ "repo": "owner/repo", "guide": "# Welcome to owner/repo\n\n## Project structure\n..." }
```
`guide` is Markdown text. The frontend renders headings, lists, bold and inline code.

## Field rules
- `riskScore`: integer 0-100, calculated by the backend.
- `riskLevel`: exactly "low", "medium" or "high" (lowercase).
- `reasons`: list of short human-readable strings explaining the score.
- `churnHistory`: monthly commit totals per file (not raw commits), oldest first.
- `ownership`: percent per author, 0-100, adding up to about 100.
- `coChanged`: list of file paths that often change together with this file.
- Empty values: use `[]`, never `null`. A repo with no data returns 200 with empty arrays.

## Errors
All errors use the standard HTTP status and this body:
```json
{ "code": "RATE_LIMITED", "message": "GitHub rate limit reached.", "retryAfterSeconds": 900 }
```
| Situation | Status | code |
|---|---|---|
| Invalid URL | 400 | INVALID_REPO_URL |
| Repo not found or private | 404 | REPO_NOT_FOUND |
| GitHub rate limit | 429 | RATE_LIMITED |
| Other failure | 500 | INTERNAL_ERROR |

## Open questions
1. Is analysis instant, or does it start a job that the frontend polls?
2. Where should issues appear (per file or repo-wide)? Not in the frontend yet.
3. Does Vasuki's API return Sangami's guide, or does the frontend call her service?
4. Is pagination needed for large repos?
5. CORS: please allow http://localhost:5173.