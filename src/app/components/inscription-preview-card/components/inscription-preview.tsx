import type { Inscription } from '@leather-wallet/models';
import { BoxProps, Flex } from 'leather-styles/jsx';

import { OrdinalAvatarIcon } from '@app/ui/components/avatar/ordinal-avatar-icon';

import { InscriptionImage } from './inscription-image';
import { InscriptionPreviewContainer } from './inscription-preview-container';
import { InscriptionText } from './inscription-text';

interface InscriptionPreviewProps extends BoxProps {
  inscription: Inscription;
}
export function InscriptionPreview({ inscription, ...props }: InscriptionPreviewProps) {
  switch (inscription.mimeType) {
    case 'image': {
      return (
        <InscriptionPreviewContainer {...props}>
          <InscriptionImage src={inscription.src} />
        </InscriptionPreviewContainer>
      );
    }
    case 'text': {
      return (
        <InscriptionPreviewContainer {...props}>
          <InscriptionText contentSrc={inscription.src} />
        </InscriptionPreviewContainer>
      );
    }
    case 'other': {
      return (
        <InscriptionPreviewContainer {...props}>
          <Flex alignItems="center" height="100%" justifyContent="center">
            <OrdinalAvatarIcon size="xl" />
          </Flex>
        </InscriptionPreviewContainer>
      );
    }
    default:
      return null;
  }
}
