FROM archlinux

# remove man pages and locale data
RUN rm -rf /archlinux/usr/share/locale && rm -rf /archlinux/usr/share/man

RUN pacman --noconfirm -Syu \
    bash-completion

RUN pacman -S --noconfirm unixodbc libgit2 wget nodejs-lts-iron
RUN wget https://dev.mysql.com/get/Downloads/Connector-ODBC/8.2/mysql-connector-odbc-8.2.0-linux-glibc2.28-x86-64bit.tar.gz
RUN tar zxvf mysql-connector-odbc-8.2.0-linux-glibc2.28-x86-64bit.tar.gz
RUN mysql-connector-odbc-8.2.0-linux-glibc2.28-x86-64bit/bin/myodbc-installer -d -a -n "MySQL ODBC 8.0 ANSI Driver" -t "DRIVER=/usr/local/lib/libmyodbc8a.so"
RUN rm -rf mysql-connector-odbc-8.2.0-linux-glibc2.28-x86-64bit
RUN rm mysql-connector-odbc-8.2.0-linux-glibc2.28-x86-64bit.tar.gz
#RUN pacman -S --noconfirm protobuf
CMD ["/bin/bash"]
