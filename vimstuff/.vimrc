set nocompatible "We want the latest Vim settings/options.
so ~/.vim/plugins.vim
syntax enable
set backspace=indent,eol,start	"Make backspace behave like every other editor. 
let mapleader=','		"The default leader is \, but a comma is much better.
let g:mapleader = ","
set number			"Let's activate line numbers.


"-----Split Management-----"
set splitbelow
set splitright

nmap <C-J> <C-W><C-J>
nmap <C-K> <C-W><C-K>
nmap <C-H> <C-W><C-H>
nmap <C-L> <C-W><C-L>


"-----Visuals-----"

colorscheme atom_dark_256	"Use 256 colors. This is useful for Terminal Vim.
set guifont=Fira_Code:h17
set macligatures
set guioptions-=e 		"We don't want GUI tabs
set linespace=15		"Macvim-specific line-height
"/ From Jeffrey Way vimrc 
set showmode                    " always show what mode we're currently editing in
set nowrap                      " don't wrap lines
set tabstop=4                   " a tab is four spaces
set smarttab
set tags=tags
set softtabstop=4               " when hitting <BS>, pretend like a tab is removed, even if spaces
set expandtab                   " expand tabs by default (overloadable per file type later)
set shiftwidth=4                " number of spaces to use for autoindenting
set shiftround                  " use multiple of shiftwidth when indenting with '<' and '>'
set autoindent                  " always set autoindenting on
set copyindent                  " copy the previous indentation on autoindenting
set ignorecase                  " ignore case when searching
set smartcase                   " ignore case if search pattern is all lowercase,
set timeout timeoutlen=200 ttimeoutlen=100
set visualbell           " don't beep
set noerrorbells         " don't beep
set autowrite  "Save on buffer switch
set mouse=a
set showcmd
"set noshowmode " Hide the default mode text (e.g. -- INSERT -- below the statusline)


"/end Jeffrey


set guioptions-=l		"Disable gui scrollbars
set guioptions-=L
set guioptions-=r
set guioptions-=R

"-----Search-----"
set hlsearch
set incsearch


"=-----Mappings-----"

"Make it easy to edit Vimrc file.
nmap <Leader>ev :tabedit $MYVIMRC<cr>

"Add simple highlight removal.
nmap <Leader><space> :nohlsearch<cr>
"Make NERDTree easier to toggle.
nmap <C-K><C-B> :NERDTreeToggle<cr>
"Open Google chrome
nmap ,c :!open -a Google\ Chrome<cr>
"Find tag
nmap <Leader>f :tag<space>

" Quickly go forward or backward to buffer
nmap :bp :BufSurfBack<cr>
nmap :bn :BufSurfForward<cr>

highlight Search cterm=underline

" Swap files out of the project root
set backupdir=~/.vim/backup//
set directory=~/.vim/swap//

"-----Plugins-----"
"/
"/ CtrlP
"/
let g:ctrlp_custom_ignore = 'node_modules\DS_Store\|git'
let g:ctrlp_match_window = 'top,order,:ttb,min:1,max:30,results:30'
nmap <C-P> :CtrlP<cr>
nmap <C-R> :CtrlPBufTag<cr>
nmap <C-E> :CtrlPMRUFiles<cr>
"/
"/ Javascript
"/
let g:javascript_plugin_flow = 0
let g:jsx_ext_required = 0
let g:ale_lint_on_save = 1
let g:ale_lint_on_text_changed = 1
let g:ale_fixers = {'javascript': ['eslint']}

let g:ale_echo_msg_error_str = 'E'
let g:ale_echo_msg_warning_str = 'W'
let g:ale_echo_msg_format = '[%linter%] %s [%severity%]'

" Set this. Airline will handle the rest.
let g:airline#extensions#ale#enabled = 1
let g:ale_javascript_eslint_executable = 'eslint'
let g:ale_javascript_eslint_use_global = 0
let g:ale_linters = {'javascript': ['eslint']}

"-----Auto-Commands-----"
"Automatically source the Vimrc file on save.

augroup autosourcing
	autocmd!
	autocmd BufWritePost .vimrc source %
augroup END

"!ctags -R              regenerate tags
":tn                    next tag
":tp                    previous tag
":ts                    select amongst all of the tags available
"gt                     switch amongst tabs

