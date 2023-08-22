import { render } from "@testing-library/react";

import { AlbumsIcon } from "@/components/icons/AlbumsIcon";
import { ArtistsIcon } from "@/components/icons/ArtistsIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

const ICONS_COMPONETS = [AlbumsIcon, ArtistsIcon, GoogleIcon];

test.each(ICONS_COMPONETS)("renders icons", (Component) => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
});
