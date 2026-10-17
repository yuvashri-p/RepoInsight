
export const analysis = {
  repo: "owner/sample-repo",

  files: [
    {
      path: "src/auth/LoginService.java",
      riskScore: 82,
      riskLevel: "high",
      reasons: [
        "High churn: 45 commits in 90 days",
        "One author owns 85% of the file",
      ],
      churnHistory: [
        { month: "Jul", commits: 8 },
        { month: "Aug", commits: 15 },
        { month: "Sep", commits: 22 },
      ],
      ownership: [
        { author: "alice", percent: 85 },
        { author: "bob", percent: 15 },
      ],
      coChanged: [
        "src/auth/TokenUtil.java",
        "src/config/SecurityConfig.java",
      ],
    },
    {
      path: "src/utils/DateHelper.java",
      riskScore: 35,
      riskLevel: "low",
      reasons: ["Stable file with few changes"],
      churnHistory: [
        { month: "Jul", commits: 1 },
        { month: "Aug", commits: 0 },
        { month: "Sep", commits: 2 },
      ],
      ownership: [
        { author: "bob", percent: 50 },
        { author: "carol", percent: 50 },
      ],
      coChanged: [],
    },
    {
      path: "src/payment/PaymentService.java",
      riskScore: 65,
      riskLevel: "medium",
      reasons: [
        "Frequent changes to payment logic",
        "Multiple contributors modified this file",
      ],
      churnHistory: [
        { month: "Jul", commits: 5 },
        { month: "Aug", commits: 12 },
        { month: "Sep", commits: 9 },
      ],
      ownership: [
        { author: "alice", percent: 60 },
        { author: "carol", percent: 40 },
      ],
      coChanged: ["src/payment/PaymentValidator.java"],
    },
  ],

  onboardingGuide: `# Welcome to Sample Repo

This project contains authentication, payment, and utility modules.

## Getting Started
1. Explore the source folder.
2. Review the authentication module.
3. Check the payment service before making changes.

## Important Note
Risk scores are indicative signals, not proof of bugs.`,
}
