SITE_DIR := www/StarterSite

.PHONY: build check serve

build: check
	hugo --source $(SITE_DIR) --destination $(CURDIR)/docs --cleanDestinationDir

check:
	node scripts/check-handbook.mjs
	node scripts/check-handbook-frontmatter.mjs

serve:
	hugo server --source $(SITE_DIR)
