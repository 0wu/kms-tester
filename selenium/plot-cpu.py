#!/usr/bin/env python
import numpy



timing_arr = numpy.load('cpu_timing.npz');
delays = numpy.fmax(timing_arr[:,:timing_arr.shape[1]-1],0)

cpu=timing_arr[:,timing_arr.shape[1]-1]

import matplotlib
matplotlib.use('Agg')

import pylab as p
p.subplot(1,2,1);
p.plot(delays)
p.title('delay');
p.xlabel('time(s)')
p.ylabel('delay(s)')

p.subplot(1,2,2);
p.plot(cpu)
p.xlabel('time(s)')
p.ylabel('cpu percentage')
p.title('cpu')
p.savefig("cpu_timing.png")
