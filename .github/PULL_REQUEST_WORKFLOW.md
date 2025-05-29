# Pull Request Workflow Guide

## 🚀 Proper GitHub Issue → PR → Merge Workflow

This guide establishes a professional development workflow for the Weather App project.

## 📋 Workflow Overview

```
Issue Created → Feature Branch → Development → Pull Request → Code Review → Merge → Issue Closed
```

## 🔧 Step-by-Step Workflow

### 1. **Create GitHub Issue**
- Go to: https://github.com/shaleen-wonder-ent/weatherapp/issues
- Click "New Issue"
- Use descriptive title: `Feature: Add [feature name]` or `Bug: Fix [bug description]`
- Include:
  - Problem description
  - Acceptance criteria
  - Implementation details
  - Labels: `enhancement`, `bug`, `documentation`, etc.

### 2. **Create Feature Branch** 
```bash
# Always start from main branch
git checkout main
git pull origin main

# Create and switch to feature branch
git checkout -b feature/issue-[number]-[short-description]
# Example: git checkout -b feature/issue-2-dark-theme
```

### 3. **Development Phase**
```bash
# Make your changes
# Test thoroughly
# Commit with meaningful messages

git add .
git commit -m "feat: implement [feature description]

- Add specific feature details
- Include any breaking changes
- Reference issue number

Closes #[issue-number]"
```

### 4. **Push Branch and Create PR**
```bash
# Push feature branch
git push origin feature/issue-[number]-[short-description]

# GitHub will show a link to create PR, or go to:
# https://github.com/shaleen-wonder-ent/weatherapp/pulls
```

### 5. **Pull Request Template**
```markdown
## 🎯 Issue Reference
Closes #[issue-number]

## 📝 Description
Brief description of what this PR does.

## 🔄 Changes Made
- [ ] Feature/fix 1
- [ ] Feature/fix 2
- [ ] Tests added/updated
- [ ] Documentation updated

## 🧪 Testing
- [ ] Local testing completed
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Cross-browser compatibility checked

## 📸 Screenshots (if applicable)
Before/After screenshots or demo GIFs

## 🔍 Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No merge conflicts
- [ ] Branch is up to date with main
```

### 6. **Merge and Cleanup**
```bash
# After PR is approved and merged
git checkout main
git pull origin main
git branch -d feature/issue-[number]-[short-description]
git push origin --delete feature/issue-[number]-[short-description]
```

## 🏷️ Branch Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/issue-[number]-[description]` | `feature/issue-2-dark-theme` |
| Bug Fix | `bugfix/issue-[number]-[description]` | `bugfix/issue-3-search-error` |
| Hotfix | `hotfix/issue-[number]-[description]` | `hotfix/issue-4-api-timeout` |
| Documentation | `docs/issue-[number]-[description]` | `docs/issue-5-setup-guide` |

## 📝 Commit Message Format

```
type(scope): short description

Longer description explaining what and why

Closes #[issue-number]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes bug nor adds feature
- `test`: Adding missing tests
- `chore`: Maintenance tasks

## 🔄 GitHub Settings for Auto-Close

To automatically close issues when PRs are merged:

1. **In PR description, use:**
   - `Closes #[number]`
   - `Fixes #[number]`
   - `Resolves #[number]`

2. **Enable branch protection (optional):**
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Require PR reviews before merging

## 🎯 Benefits of This Workflow

- ✅ **Automatic issue closing** when PRs merge
- ✅ **Code review process** for quality control
- ✅ **Clear change tracking** with linked issues
- ✅ **Safe main branch** - no direct commits
- ✅ **Rollback capability** if issues arise
- ✅ **Professional development** practices

## 🚀 Quick Commands Cheat Sheet

```bash
# Start new feature
git checkout main && git pull origin main
git checkout -b feature/issue-X-description

# Commit and push
git add . && git commit -m "feat: description

Closes #X"
git push origin feature/issue-X-description

# Cleanup after merge
git checkout main && git pull origin main
git branch -d feature/issue-X-description
```

## 📋 Next Steps

1. Create your next issue on GitHub
2. Follow this workflow for implementation
3. Create PR with proper template
4. Merge and see automatic issue closure! 🎉
