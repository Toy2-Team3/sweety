import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { styled } from "styled-components";
import { CommonData } from "../../pages/CommunityListPage";

interface PopoverProps {
  item: CommonData;
}

const MouseOverPopover: React.FC<PopoverProps> = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <ModalTop
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ImageWrapper>
          <img src={item.profileUrl} alt="user image" />
        </ImageWrapper>
        <div>
          <h3>{item.nickName}</h3>
          <span>{item.region}</span>
        </div>
      </ModalTop>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>I use Popover.</Typography>
      </Popover>
    </div>
  );
};

export default MouseOverPopover;

const ModalTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 1rem;

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.3rem;

    ${(props) => props.theme.response.mobile} {
      font-size: 1.2rem;
    }
  }

  span {
    color: #949494;
    font-size: 1rem;
  }
`;
const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;

  ${(props) => props.theme.response.mobile} {
    width: 3.3rem;
    height: 3.3rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
