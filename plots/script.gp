set terminal png
set output 'plot.png'

set title "Количество подписчиков случайного YouTube-канала"
set xlabel "Дата"
set ylabel "Количество подписчиков(тыс.)"

set xdata time
set timefmt "%Y-%m-%d"
plot "data.tsv" using 1:2 title "Данные", "data.tsv" using 1:3 title "аппроксимация" with lines