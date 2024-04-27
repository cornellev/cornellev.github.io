# Copyright (C) 2024 CEV Autonomy and Ethan Uppal. All rights reserved.

PY              = python3
JS_PATH         = src/js
LESS_PATH       = src/css
SERVER          = server.py

JS_SRC          = $(filter-out %.min.js, $(wildcard \
	$(JS_PATH)/*.js \
	$(JS_PATH)/**/*.js \
))
JS_MINIFIED     = $(JS_SRC:.js=.min.js)

LESS_SRC        = $(wildcard \
	$(LESS_PATH)/*.less \
	$(LESS_PATH)/**/*.less \
)
CSS_LESSED      = $(LESS_SRC:.less=.css)

UGLIFYJS        = $(shell which uglifyjs)
UGLIFYJS_FLAGS  = --compress --mangle --comments "^\/* Copyright \(C\).+\n"

LESS            = $(shell which lessc)
LESS_FLAGS      = --compress

serve: src
	$(PY) $(SERVER)

src: $(JS_MINIFIED) $(CSS_LESSED)
	@echo '==> Rebuilding src files'
	@echo

%.css: %.less
	@echo '==> Lessing $<'
	head -n 1 $< > $@.temp
	$(LESS) $< $@
	cat $@ >> $@.temp
	mv $@.temp $@
	rm -rf $@.temp
	@echo

%.min.js: %.js
	@echo '==> Minifying $<'
	$(UGLIFYJS) -- $< > $@
	@echo

.PHONY: clean_mac
clean_mac:
	rm -rf $(shell find . -name ".DS_Store" -type f)

.PHONY: clean
clean:
	rm -f $(JS_MINIFIED) $(CSS_LESSED)
