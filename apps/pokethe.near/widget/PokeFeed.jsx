const accountId = props.accountId || context.accountId || "root.near";

const { Feed } = VM.require("${alias_devs}/widget/Feed") || {
  Feed: () => <></>,
};

const items = Social.index("notify", accountId, { limit: 100, order: "desc", subscribe: true });

if (!items || !items.length) {
  return <p>Failure</p>;
}

const filteredItems = items.filter((a) => a.value.type === "poke");

if (!filteredItems || !filteredItems.length) {
  return <p>No pokes</p>;
}

return (
  <div style={{ height: "100%", width: "100%" }}>
    <Feed
      items={filteredItems}
      // index={{
      //   action: "notify",
      //   key: accountId,
      //   options: {
      //     limit: 100,
      //     order: "desc",
      //     subscribe: true,
      //   },
      //   cacheOptions: {
      //     ignoreCache: true,
      //   },
      // }}
      // typeWhitelist={["poke"]}
      Item={(a) => {
        return (
          <Widget
            src="${config_account}/widget/PokeItem"
            props={{ poker: a.accountId, target: accountId, blockHeight: a.blockHeight }}
          />
        );
      }}
      Layout={({ children }) => (
        <div
          style={{
            // height: "100%",
            // maxHeight: "100vh",
            // overflowY: "scrollable",
          }}
        >
          {children}
        </div>
      )}
    />
  </div>
);
