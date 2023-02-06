
# Load packages
library(tidyverse)
library(crosstalk)
library(ggsci)
library(scales)
library(plotly)


# This code reads a CSV file named "bps_aoi_disturbances.csv" from the "data" directory into a data frame.
bps_aoi_disturbances <- read_csv("data/bps_aoi_disturbances.csv") 

# The data frame is then filtered to exclude certain values in the "TransitionGroupID" column. 
# The excluded values are: "All Fire", "All Transitions", "Alternative Succession", 
# "Non Fire Disturbances", "Non Replacement Fire", "Optional 1", "Optional 2".
bps_aoi_disturbances <- bps_aoi_disturbances %>%
  filter(!TransitionGroupID %in% c("All Fire",
                                   "All Transitions",
                                   "Alternative Succession",
                                   "Non Fire Disturbances",
                                   "Non Replacement Fire",
                                   "Optional 1",
                                   "Optional 2")) 

# The data frame is then grouped by the "BpS_Name" and "TransitionGroupID" columns. 
# The annual_dist_acres column is then summarized with the sum of all values for each group. 
bps_aoi_disturbances <- bps_aoi_disturbances %>%
  group_by(BpS_Name, TransitionGroupID) %>%
  summarise(annual_dist_acres = sum(annual_dist_acres)) 

# The annual_dist_acres column is then converted to a numeric format, 
# with trailing zeros removed and rounded to 0 decimal places.
bps_aoi_disturbances <- bps_aoi_disturbances %>% 
  mutate(annual_dist_acres = as.numeric(format(round(annual_dist_acres, 0), scientific = FALSE)))

# A new data frame "sdbps_aoi_disturbances" is created, 
# with a highlight function applied to the original data frame.
sdbps_aoi_disturbances <- highlight_key(bps_aoi_disturbances)

# A ggplot chart is created using the "sdbps_aoi_disturbances" data frame. 
# The chart plots the TransitionGroupID column on the X-axis, 
# and the annual_dist_acres column on the Y-axis. 
# The chart has a title, labels for the X and Y axes, 
# and the Y-axis has a continuous scale with comma formatted labels.
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

# The chart is displayed.
bpsChart

# A chart with a dropdown list is created with tooltips disabled.
bscols(widths = c(3, 10),
       filter_select("BP", 
                     "Select ecosystem", 
                     sdbps_aoi_disturbances, 
                     ~ BpS_Name,
                     multiple = FALSE),
       ggplotly(bpsChart,
                tooltip = FALSE)
)