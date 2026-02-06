import IconPremiumPlus from "@/public/assets/icons/IconPremiumPlus";
import IconPremium from "@/public/assets/icons/IconPremium";
import IconVip from "@/public/assets/icons/IconVip";

export default function StatusIcon({status, className}) {

  if(status === "PREMIUM_PLUS") return <IconPremiumPlus classname={className}/>;
  if(status === "PREMIUM") return <IconPremium className={className}/>;
  if(status === "VIP") return <IconVip className={className}/>;
  return "";
}