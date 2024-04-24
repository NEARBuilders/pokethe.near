const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  max-width: 100%;

  background-color: #f0f0f0;

  padding-bottom: 100px;
  margin: 10px;
  border-radius: 30px;
`;

const TargetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
    margin: 0;
  }
`;

const PokeFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const PokeIcon = styled.span`
  font-size: 3rem;
  position: absolute;
  right: 3rem;
  transition: transform 0.2s;
`;

const PokeTarget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  cursor: pointer;
  transition: transform 0.2s;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover #poke {
    transform: translateX(100%);
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

if (!context.accountId) {
  return (
    <Container>
      <p>Please login</p>
    </Container>
  );
}

const target = "mob.near";

// vote for somebody to be the bos

const [clicked, setClicked] = useState(false);
const [showSettings, setShowSettings] = useState(false);

const poke = () => {
  setClicked(!clicked);
  Social.set(
    {
      index: {
        graph: JSON.stringify({
          key: "poke",
          value: {
            accountId: target,
          },
        }),
        notify: JSON.stringify({
          key: target,
          value: {
            type: "poke",
          },
        }),
      },
    },
    {
      force: true,
      onCommit: () => {},
      onCancel: () => {},
    }
  );
};

return (
  <Container>
    <Header>
      <h1>
        <span onClick={() => setShowSettings(!showSettings)}>
          <i className="bi bi-gear-fill" />
        </span>
        <a
          href="https://github.com/nearbuilders/pokethe.near"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="github"
        >
          <i className="bi bi-github" />
        </a>
      </h1>
    </Header>
    <div>
      <TargetContainer>
        <PokeTarget onClick={poke} clicked={clicked}>
          <Widget
            src="${alias_mob}/widget/ProfileImage"
            props={{
              accountId: target,
              style: { width: "8rem", height: "8rem" },
              imageClassName: "rounded-5 w-100 h-100 align-bottom",
            }}
          />
          <PokeIcon id="poke" role="img" aria-label="poke">
            👈
          </PokeIcon>
        </PokeTarget>
        <div>
          <Widget
            src="${alias_mob}/widget/N.ProfileLine"
            props={{
              accountId: target,
              tooltip: true,
              hideImage: true,
            }}
          />
        </div>
        <h1>poke a bos</h1>{" "}
      </TargetContainer>
      <PokeFeedContainer>
        <h3>Activity</h3>
        <Widget src="${config_account}/widget/PokeFeed" props={{ accountId: target }} />
      </PokeFeedContainer>
    </div>
    <Footer>{/*  */}</Footer>
  </Container>
);
