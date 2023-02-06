

library(tidyverse)
library(crosstalk)
library(ggsci)
library(scales)
library(plotly)



bps_aoi_disturbances <- read_csv("data/bps_aoi_disturbances.csv") %>%
  filter(!TransitionGroupID %in% c("All Fire",
                                   "All Transitions",
                                   "Alternative Succession",
                                   "Non Fire Disturbances",
                                   "Non Replacement Fire",
                                   "Optional 1",
                                   "Optional 2")) %>%
  group_by(BpS_Name, TransitionGroupID) %>%
  summarise(annual_dist_acres = sum(annual_dist_acres)) %>% 
  mutate(annual_dist_acres = as.numeric(format(round(annual_dist_acres, 0), scientific = FALSE)))


sdbps_aoi_disturbances <- highlight_key(bps_aoi_disturbances)



# plot
bpsChart <- 
  ggplot(sdbps_aoi_disturbances, aes(x = TransitionGroupID, y = annual_dist_acres)) +
  geom_point(size = 3) +
  labs(
    title = "Annual historical disturbances",
    x = "",
    y = "Acres") +
  coord_flip() +
  scale_y_continuous(labels = comma)+
  theme_bw()

bpsChart

bscols(widths = c(3, 10),
       filter_select("BP", 
                     "Select ecosystem", 
                     sdbps_aoi_disturbances, 
                     ~ BpS_Name,
                     multiple = FALSE),
       ggplotly(bpsChart,
                tooltip = FALSE)
)



