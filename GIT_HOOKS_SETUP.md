# Commit Message Hook Configuration

To ensure all commit messages are automatically converted to lowercase, follow these steps:

1. Create a script at `.githooks/commit-msg`:
   ```bash
   #!/bin/bash
   COMMIT_MSG_FILE=$1
   COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")
   echo "${COMMIT_MSG,,}" > "$COMMIT_MSG_FILE"
   ```

2. Make it executable:
   ```bash
   chmod +x .githooks/commit-msg
   ```

3. Configure git to use this hooks directory:
   ```bash
   git config core.hooksPath .githooks
   ```
