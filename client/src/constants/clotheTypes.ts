import { ClotheCategories } from "../enums/clothes";
import { OptionItem } from "../interfaces/components";

export const CLOTHE_TYPES: OptionItem[] = [
  {
    value: ClotheCategories.TOP_AND_T_SHIRTS,
    label: ClotheCategories.TOP_AND_T_SHIRTS,
  },
  {
    value: ClotheCategories.SWEATER_AND_HOODIES,
    label: ClotheCategories.SWEATER_AND_HOODIES,
  },
  {
    value: ClotheCategories.BOTTOMS_AND_LEGGINGS,
    label: ClotheCategories.BOTTOMS_AND_LEGGINGS,
  },

  {
    value: ClotheCategories.JUMPSUITS_AND_DRESSES,
    label: ClotheCategories.JUMPSUITS_AND_DRESSES,
  },
  {
    value: ClotheCategories.JACKETS_AND_COATS,
    label: ClotheCategories.JACKETS_AND_COATS,
  },
  {
    value: ClotheCategories.SHORTS_AND_SKIRTS,
    label: ClotheCategories.SHORTS_AND_SKIRTS,
  },
  {
    value: ClotheCategories.SHOES_AND_SOCKS,
    label: ClotheCategories.SHOES_AND_SOCKS,
  },
  {
    value: ClotheCategories.SUIT,
    label: ClotheCategories.SUIT,
  },
  {
    value: ClotheCategories.ACCESSORIES,
    label: ClotheCategories.ACCESSORIES,
  },
  {
    value: ClotheCategories.OTHER,
    label: ClotheCategories.OTHER,
  },
];

export const CLOTHE_TYPES_ARRAY = CLOTHE_TYPES.map((type) => type.value);

export const SEASONS: OptionItem[] = [
  {
    value: "Winter",
    label: "Winter",
  },
  {
    value: "Spring",
    label: "Spring",
  },
  {
    value: "Summer",
    label: "Summer",
  },
  {
    value: "Fall",
    label: "Fall",
  },
  {
    value: "All",
    label: "All",
  },
];
export const SEASONS_ARRAY = SEASONS.map((season) => season.value);
