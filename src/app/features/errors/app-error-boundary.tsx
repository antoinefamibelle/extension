import { useRouteError } from 'react-router-dom';

import BroadcastError from '@assets/images/unhappy-face-ui.png';
import { isError } from '@leather-wallet/utils';
import { SharedComponentsSelectors } from '@tests/selectors/shared-component.selectors';
import { Box, Flex, HStack, styled } from 'leather-styles/jsx';

import { Prism } from '@app/common/clarity-prism';
import { useClipboard } from '@app/common/hooks/use-copy-to-clipboard';
import { Button } from '@app/ui/components/button/button';
import { CodeBlock } from '@app/ui/components/codeblock';
import { Link } from '@app/ui/components/link/link';
import { CopyIcon } from '@app/ui/icons';

import { useToast } from '../toasts/use-toast';

function ErroBoundaryBody() {
  return (
    <styled.span
      data-testid={SharedComponentsSelectors.BroadcastErrorTitle}
      mx="space.05"
      mt="space.05"
      textStyle="label.02"
    >
      Leather has crashed. If this problem persists, contact our{' '}
      <Link
        href="https://leather.gitbook.io/guides/installing/contact-support"
        target="_blank"
        textDecoration="underline"
      >
        <styled.span
          data-testid={SharedComponentsSelectors.BroadcastErrorTitle}
          textStyle="label.02"
        >
          support team.
        </styled.span>
      </Link>
    </styled.span>
  );
}

const title = 'Something went wrong';

const defaultErrorText = 'Unknown error';

function getErrorText(error: unknown) {
  if (!isError(error)) return defaultErrorText;
  return error.stack || defaultErrorText;
}

export function RouterErrorBoundary() {
  const error = useRouteError();
  const toast = useToast();

  const errorText = getErrorText(error);

  const { onCopy } = useClipboard(getErrorText(error));

  function onClickCopy() {
    onCopy();
    toast.success('Error copied!');
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={['space.05', 'unset']}
      py={['space.05', 'space.06']}
      width="100%"
      maxWidth="500px"
    >
      <Box mt="space.05">
        <img src={BroadcastError} alt="Unhappy user interface cloud" width="106px" />
      </Box>

      <styled.span
        data-testid={SharedComponentsSelectors.BroadcastErrorTitle}
        mx="space.05"
        mt="space.05"
        textStyle="heading.05"
      >
        {title}
      </styled.span>

      <ErroBoundaryBody />

      {errorText && (
        <CodeBlock
          bg="ink.background-secondary"
          borderRadius="sm"
          my="space.05"
          mx="space.05"
          p="space.04"
          prism={Prism}
          code={errorText}
          language="json"
          hideLineHover
        />
      )}

      <HStack width="100%" gap="space.04">
        <Button
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="5"
          onClick={onClickCopy}
          variant="outline"
        >
          Copy error
          <CopyIcon />
        </Button>
        <Button flex="1" onClick={() => window.location.reload()}>
          Reload extension
        </Button>
      </HStack>
    </Flex>
  );
}
