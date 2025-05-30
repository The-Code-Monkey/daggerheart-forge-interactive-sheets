import Text from "@/components/atoms/Text";

const HeroStats = () => {
  return (
    <div className="mt-16 flex justify-center items-center space-x-8 text-purple-300">
      <div className="text-center">
        <Text variant="h4" color="primary">
          10K+
        </Text>
        <Text variant="caption" color="secondary">
          Characters Created
        </Text>
      </div>
      <div className="w-px h-12 bg-purple-600"></div>
      <div className="text-center">
        <Text variant="h4" color="primary">
          500+
        </Text>
        <Text variant="caption" color="secondary">
          Active Campaigns
        </Text>
      </div>
    </div>
  );
};

export default HeroStats;
