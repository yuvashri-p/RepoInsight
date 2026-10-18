
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
    {
      path: "src/auth/TokenUtil.java",
      riskScore: 74,
      riskLevel: "high",
      reasons: [
        "Frequently changes with authentication logic",
        "High concentration of code ownership",
      ],
      churnHistory: [
        { month: "Jul", commits: 7 },
        { month: "Aug", commits: 11 },
        { month: "Sep", commits: 14 },
      ],
      ownership: [
        { author: "alice", percent: 80 },
        { author: "bob", percent: 20 },
      ],
      coChanged: ["src/auth/LoginService.java"],
    },
    {
      path: "src/config/SecurityConfig.java",
      riskScore: 78,
      riskLevel: "high",
      reasons: [
        "Security configuration changes frequently",
        "Most changes come from one contributor",
      ],
      churnHistory: [
        { month: "Jul", commits: 6 },
        { month: "Aug", commits: 10 },
        { month: "Sep", commits: 13 },
      ],
      ownership: [
        { author: "alice", percent: 75 },
        { author: "carol", percent: 25 },
      ],
      coChanged: ["src/auth/LoginService.java"],
    },
    {
      path: "src/payment/PaymentValidator.java",
      riskScore: 58,
      riskLevel: "medium",
      reasons: [
        "Regular changes to payment validation",
        "Shares changes with PaymentService",
      ],
      churnHistory: [
        { month: "Jul", commits: 4 },
        { month: "Aug", commits: 8 },
        { month: "Sep", commits: 7 },
      ],
      ownership: [
        { author: "bob", percent: 60 },
        { author: "carol", percent: 40 },
      ],
      coChanged: ["src/payment/PaymentService.java"],
    },
    {
      path: "src/user/UserController.java",
      riskScore: 48,
      riskLevel: "medium",
      reasons: [
        "Moderate code churn",
        "Modified by multiple contributors",
      ],
      churnHistory: [
        { month: "Jul", commits: 3 },
        { month: "Aug", commits: 6 },
        { month: "Sep", commits: 5 },
      ],
      ownership: [
        { author: "bob", percent: 55 },
        { author: "alice", percent: 45 },
      ],
      coChanged: ["src/user/UserService.java"],
    },
    {
      path: "src/user/UserService.java",
      riskScore: 67,
      riskLevel: "medium",
      reasons: [
        "Frequent updates to user logic",
        "Changes alongside UserController",
      ],
      churnHistory: [
        { month: "Jul", commits: 5 },
        { month: "Aug", commits: 9 },
        { month: "Sep", commits: 8 },
      ],
      ownership: [
        { author: "alice", percent: 65 },
        { author: "bob", percent: 35 },
      ],
      coChanged: ["src/user/UserController.java"],
    },
    {
      path: "src/database/DatabaseConfig.java",
      riskScore: 28,
      riskLevel: "low",
      reasons: ["Configuration file has remained stable"],
      churnHistory: [
        { month: "Jul", commits: 1 },
        { month: "Aug", commits: 1 },
        { month: "Sep", commits: 0 },
      ],
      ownership: [
        { author: "carol", percent: 50 },
        { author: "bob", percent: 50 },
      ],
      coChanged: [],
    },
    {
      path: "src/utils/StringHelper.java",
      riskScore: 22,
      riskLevel: "low",
      reasons: ["Few changes and shared code ownership"],
      churnHistory: [
        { month: "Jul", commits: 0 },
        { month: "Aug", commits: 2 },
        { month: "Sep", commits: 1 },
      ],
      ownership: [
        { author: "bob", percent: 50 },
        { author: "carol", percent: 50 },
      ],
      coChanged: [],
    },
    {
      path: "src/order/OrderService.java",
      riskScore: 88,
      riskLevel: "high",
      reasons: [
        "High frequency of recent changes",
        "One contributor owns most modifications",
      ],
      churnHistory: [
        { month: "Jul", commits: 10 },
        { month: "Aug", commits: 16 },
        { month: "Sep", commits: 20 },
      ],
      ownership: [
        { author: "alice", percent: 90 },
        { author: "bob", percent: 10 },
      ],
      coChanged: ["src/order/OrderController.java"],
    },
    {
      path: "src/order/OrderController.java",
      riskScore: 62,
      riskLevel: "medium",
      reasons: [
        "Regular changes to order handling",
        "Frequently changes with OrderService",
      ],
      churnHistory: [
        { month: "Jul", commits: 4 },
        { month: "Aug", commits: 7 },
        { month: "Sep", commits: 9 },
      ],
      ownership: [
        { author: "alice", percent: 60 },
        { author: "carol", percent: 40 },
      ],
      coChanged: ["src/order/OrderService.java"],
    },
    {
      path: "src/notification/EmailService.java",
      riskScore: 43,
      riskLevel: "medium",
      reasons: [
        "Occasional changes to notification logic",
        "Moderate contributor concentration",
      ],
      churnHistory: [
        { month: "Jul", commits: 2 },
        { month: "Aug", commits: 5 },
        { month: "Sep", commits: 4 },
      ],
      ownership: [
        { author: "bob", percent: 60 },
        { author: "carol", percent: 40 },
      ],
      coChanged: [],
    },
    {
      path: "src/logging/LoggerUtil.java",
      riskScore: 18,
      riskLevel: "low",
      reasons: ["Very few recent changes"],
      churnHistory: [
        { month: "Jul", commits: 0 },
        { month: "Aug", commits: 1 },
        { month: "Sep", commits: 0 },
      ],
      ownership: [
        { author: "carol", percent: 70 },
        { author: "bob", percent: 30 },
      ],
      coChanged: [],
    },
    {
      path: "src/report/ReportGenerator.java",
      riskScore: 71,
      riskLevel: "high",
      reasons: [
        "Frequent modifications to report generation",
        "High concentration of code ownership",
      ],
      churnHistory: [
        { month: "Jul", commits: 6 },
        { month: "Aug", commits: 12 },
        { month: "Sep", commits: 15 },
      ],
      ownership: [
        { author: "alice", percent: 80 },
        { author: "carol", percent: 20 },
      ],
      coChanged: [],
    },
  ],

  onboardingGuide: `# Welcome to Sample Repo

This project contains authentication, payment, user management, order processing, reporting, and utility modules.

## Getting Started
1. Explore the source folder.
2. Review the authentication and security modules.
3. Check the payment and order services before making changes.
4. Review the user management and notification modules.
5. Check file risk scores and dependencies before modifying code.

## Important Note
Risk scores are indicative signals, not proof of bugs.`,
}
