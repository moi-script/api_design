
// Function protection
// The main point here is to check the role of a user for conduction a certain function inside API 


// There is different kinds of roles everywhere


// 1. Basic consumer apps (Facebook, e-commerce, etc.)
// user
// premium_user
// guest

// What they mean:

// user → can use normal features
// premium_user → extra features (subscriptions, perks)
// guest → limited or read-only access
//  2. Admin systems (most web apps)
// user
// moderator
// admin

// Meaning:

// user → normal actions (post, edit own data)
// moderator → can review content, ban users
// admin → full control (manage users, system settings)
// 3. Enterprise / company systems
// employee
// manager
// hr
// finance
// auditor
// it_support

// Meaning:

// employee → basic access (own profile, tasks)
// manager → team management, approvals
// hr → employee records
// finance → payments, salaries
// auditor → read-only full access
// it_support → system maintenance tools
//  4. Banking-style systems (closer to BDO idea)

// Banks often still use roles, but more granular:

// customer
// teller
// branch_manager
// compliance_officer
// system_admin


// But importantly:
// Even these roles are NOT enough alone (they add policies on top)



