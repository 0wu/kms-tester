#!/usr/bin/env python

import psutil

def get_kurento_cpu_percent(interval=1):
        name2pid={}
        for i in psutil.pids():
            try:
                name2pid[psutil.Process(i).name()]=i
            except e:
                pass
        pid_kms=name2pid['kurento-media-server']
        proc_kms=psutil.Process(pid_kms)
        p=proc_kms.cpu_percent(interval=1)
        return p;

if __name__ == '__main__':
    print get_kurento_cpu_percent()


