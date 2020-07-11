#!/usr/bin/env bash
bold=$(tput bold)
normal=$(tput sgr0)

BLUE='\033[0;36m'
NC='\033[0m'

printf "${BLUE}"
printf "${bold}Step [1/2] : Build${normal}\n"
printf "${NC}"

npm run build

printf "${BLUE}"
printf "\n%s\n" "${bold}Step [2/2] : Running Application${normal}"
printf "${NC}"

npm start