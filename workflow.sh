#!/bin/bash
# Weather App Development Workflow Helper

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}🚀 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Help function
show_help() {
    echo "Weather App Workflow Helper"
    echo ""
    echo "Usage: ./workflow.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  start-feature <issue-number> <description>  Start a new feature branch"
    echo "  finish-feature                              Push branch and show PR creation link"
    echo "  cleanup                                     Clean up merged branches"
    echo "  sync                                        Sync with main branch"
    echo "  help                                        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./workflow.sh start-feature 2 dark-theme"
    echo "  ./workflow.sh finish-feature"
    echo "  ./workflow.sh cleanup"
}

# Start a new feature
start_feature() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        print_error "Usage: start-feature <issue-number> <description>"
        exit 1
    fi
    
    ISSUE_NUM=$1
    DESCRIPTION=$2
    BRANCH_NAME="feature/issue-${ISSUE_NUM}-${DESCRIPTION}"
    
    print_step "Starting new feature branch: ${BRANCH_NAME}"
    
    # Ensure we're on main and up to date
    git checkout main
    git pull origin main
    
    # Create and switch to feature branch
    git checkout -b "${BRANCH_NAME}"
    
    print_success "Feature branch '${BRANCH_NAME}' created and checked out"
    print_warning "Don't forget to reference 'Closes #${ISSUE_NUM}' in your commit messages!"
}

# Finish feature and prepare for PR
finish_feature() {
    CURRENT_BRANCH=$(git branch --show-current)
    
    if [ "$CURRENT_BRANCH" = "main" ]; then
        print_error "You're on the main branch. Switch to a feature branch first."
        exit 1
    fi
    
    print_step "Finishing feature branch: ${CURRENT_BRANCH}"
    
    # Ensure all changes are committed
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Please commit them first."
        git status
        exit 1
    fi
    
    # Push the branch
    git push origin "${CURRENT_BRANCH}"
    
    # Show PR creation link
    REPO_URL="https://github.com/shaleen-wonder-ent/weatherapp"
    PR_URL="${REPO_URL}/compare/main...${CURRENT_BRANCH}?expand=1"
    
    print_success "Branch pushed successfully!"
    echo ""
    print_step "Create your Pull Request here:"
    echo "${PR_URL}"
    echo ""
    print_warning "Remember to:"
    echo "  - Fill out the PR template"
    echo "  - Reference the issue number"
    echo "  - Add screenshots if UI changes"
    echo "  - Request a review if needed"
}

# Cleanup merged branches
cleanup() {
    print_step "Cleaning up merged branches"
    
    # Switch to main
    git checkout main
    git pull origin main
    
    # Delete merged local branches
    git branch --merged | grep -E "(feature|bugfix|hotfix)/" | xargs -r git branch -d
    
    # Prune remote branches
    git remote prune origin
    
    print_success "Cleanup completed"
}

# Sync with main branch
sync() {
    print_step "Syncing with main branch"
    
    CURRENT_BRANCH=$(git branch --show-current)
    
    # Fetch latest changes
    git fetch origin
    
    # If on main, just pull
    if [ "$CURRENT_BRANCH" = "main" ]; then
        git pull origin main
    else
        # If on feature branch, rebase on main
        print_step "Rebasing ${CURRENT_BRANCH} on main"
        git rebase origin/main
    fi
    
    print_success "Sync completed"
}

# Main script logic
case "${1:-help}" in
    start-feature)
        start_feature "$2" "$3"
        ;;
    finish-feature)
        finish_feature
        ;;
    cleanup)
        cleanup
        ;;
    sync)
        sync
        ;;
    help|*)
        show_help
        ;;
esac
